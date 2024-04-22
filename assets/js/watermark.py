from PIL import Image, ImageDraw, ImageFont


def add_watermark(image_path, watermark_text, output_path):
    original_image = Image.open(image_path)
    width, height = original_image.size

    # Load a font
    font = ImageFont.truetype("arial.ttf", 36)  # Adjust size and font as needed

    # Create a drawing context
    draw = ImageDraw.Draw(original_image)
    text_width, text_height = draw.textsize(watermark_text, font=font)

    # Position the text at the bottom right
    position = (width - text_width - 10, height - text_height - 10)

    # Apply the text as a watermark
    draw.text(
        position, watermark_text, font=font, fill=(255, 255, 255, 128)
    )  # White text with opacity

    # Save the watermarked image
    original_image.save(output_path)


# Example usage
add_watermark(
    "path_to_original_image.jpg", "Watermark Text", "path_to_output_image.jpg"
)
