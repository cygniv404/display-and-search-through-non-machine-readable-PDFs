from io import open, BytesIO
import json
import flask
import pandas as pd
import collections

# load raw data
data_token_file = 'tokens.json'
with open(data_token_file, 'r', encoding='utf-8') as input:
    tokens = json.load(input)
input.close()

# transform raw data to be api query ready
transformed_tokens = {}
grouped = collections.defaultdict(list)
for item in tokens:
    grouped[tokens[item]['page']].append(item)
for model, group in grouped.items():
    for token_id in group:
        new_token = tokens[token_id]
        del new_token['page']
        new_token['token_id'] = token_id
        if model in transformed_tokens.keys():
            transformed_tokens[model].append(new_token)
        else:
            transformed_tokens[model] = [new_token]

def find_images(q):
    pages = []
    for document in transformed_tokens:
        for tokens in transformed_tokens[document]:
            if q.lower() in tokens['text'].lower():
                pages.append(document)
    return pages
def create_app():
    app = flask.Flask(__name__)

    @app.route('/', methods=['GET', 'POST'])
    def index():
        """
        Index page view handler.
        :return: rendered index.html template
        """
        return flask.render_template('index.html')

    @app.route('/images', methods=['GET', 'POST'])
    def images_all():
        """
        Document images view handler
        :return: Blob object of the specific image
        """
        image_binary = read_image('images/image_1.png')
        return send_file(
            BytesIO(image_binary),
            mimetype='image/png',
            as_attachment=True,
            attachment_filename='image_1.jpg')

    @app.route('/data', methods=['GET', 'POST'])
    def data():
        """
        Data view handler
        :return: JSON object of the data
        """
        if 'query' in flask.request.args.keys():
            return flask.jsonify(find_images(flask.request.args.get('query')))
        return flask.jsonify(tokens)

    @app.route('/data/<int:pid>', methods=['GET', 'POST'])
    def transformed_data(pid):
        """
        Data page view handler
        :return: JSON object of the data specific to a single page
        """
        return flask.jsonify(transformed_tokens[pid])

    @app.route('/images/<int:d_id>', methods=['GET', 'POST'])
    def images(d_id):
        """
        Document images view handler
        :return: Blob object of the specific image
        """
        return flask.send_file('images/image_%s.png' % d_id, mimetype='image/png')

    return app


if __name__ == "__main__":
    app = create_app()
    # serve the application on port 7474
    app.run(host='127.0.0.1', port=7474)
