from flask import Flask, request, jsonify
import whisper, os

app = Flask(__name__)

# Load Whisper offline model once
try:
    model = whisper.load_model("base")  # "tiny" if low-end PC
    print("Whisper model loaded successfully.")
except Exception as e:
    print("MODEL LOAD ERROR:", e)
    raise SystemExit("Install Whisper correctly before running.")


@app.get("/")
def home():
    """Serve UI"""
    html_path = os.path.join(os.path.dirname(__file__), "static", "index.html")
    return open(html_path, "r", encoding="utf-8").read()


@app.post("/transcribe")
def transcribe():
    """Handle file upload + speech recognition offline"""
    if "audio" not in request.files:
        return jsonify({"error": "No file received"}), 400

    audio = request.files["audio"]
    save_path = os.path.join(os.path.dirname(__file__), "temp_upload.wav")
    audio.save(save_path)

    try:
        result = model.transcribe(save_path)
        text = result.get("text", "").strip()
        os.remove(save_path)
        return text if text else "No speech detected in the audio."
    except Exception as e:
        print("SERVER ERROR:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Run local server
    app.run(host="127.0.0.1", port=5000, debug=True)
    