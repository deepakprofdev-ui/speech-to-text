from flask import Flask, request, jsonify
import whisper, os

app = Flask(__name__)

# tiny = best chance to survive on free hosting
model = whisper.load_model("tiny")

@app.get("/")
def home():
    return open("static/index.html", "r", encoding="utf-8").read()

@app.post("/transcribe")
def transcribe():
    if "audio" not in request.files:
        return jsonify({"error": "No audio received"}), 400
    
    audio = request.files["audio"]
    path = "temp.wav"
    audio.save(path)

    try:
        result = model.transcribe(path)
        os.remove(path)
        return result.get("text", "").strip()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
