from flask import Flask, request, jsonify
from flask_cors import CORS
from style_transfer import stylize_image
import random
import base64
import io


app = Flask(__name__)
CORS(app)


@app.route('/stylize-image', methods=['POST'])
def stylize():
    content_image = request.files['content_image']
    style_image = request.files['style_image']

    random_number = ''.join(random.choice('0123456789') for _ in range(8))
    content_path = f'images/content-{random_number}.jpg'
    style_path = f'images/style-{random_number}.jpg'
    content_image.save(content_path)
    style_image.save(style_path)

    stylized_image = stylize_image(content_path, style_path)

    image_bytes = io.BytesIO()
    stylized_image.save(image_bytes, format='JPEG')
    image_bytes.seek(0)
    encoded_img = base64.b64encode(image_bytes.read()).decode('utf-8')

    return jsonify({'stylized_image': encoded_img})

if __name__ == '__main__':
    app.run()