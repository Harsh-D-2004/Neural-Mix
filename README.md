# 🎛️ Neural Mix

## 🧠 Project Overview

This project bridges a **Flask backend** with an **Electron frontend** to build a cross-platform desktop application that enables **programmatic control of VST plugins**. It leverages user-generated queries to map and control various knobs and parameters in the VSTs dynamically.

By integrating audio processing with intuitive web technologies, this project allows musicians, sound designers, and developers to automate and fine-tune audio plugin parameters through natural language or structured inputs.

---

## 🚀 Key Features

- **VST Plugin Mapping Engine**  
  Accepts user queries and intelligently maps them to specific controls in a VST plugin.

- **Programmatic VST Control**  
  Directly controls plugin knobs and parameters from the backend using defined mappings.

- **Flask-Based Backend**  
  Handles IPC communication, plugin control logic, and integrates with DAW/plugin wrappers.

- **Electron Frontend**  
  Provides an interactive GUI to input commands, view current plugin mappings, and trigger actions.

---

## 🧰 Technologies Used

- **Backend**: Flask (Python) , LLM Integration
- **Frontend**: Electron (JavaScript/Node.js)
- **Audio Interface**: Host Interface (externally)
- **Languages**: Python, JavaScript

---

## ⚙️ Prerequisites

- **Flask**: Python microframework for the backend logic.
- **Node.js & npm**: Required to run the Electron-based frontend.
- **VST Hosting/Access Setup**: Your system must support VST interfacing (e.g., via a host wrapper).
- **Open API key**

---

## 📦 Setup Instructions

### 🔧 Backend Setup

1. Install Flask:
   ```bash
   pip install Flask
   ```
The Flask app will run on http://localhost:5000 by default.

### 🖥️ Frontend Setup (Electron)
1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install Node modules:
   ```bash
   npm install
   ```

3. Run the Electron application:
   ```bash
   npm start
   ```
This will open a desktop window (not on a specific HTTP port).

---

## 🧪 Example Use Case
User enters: "Increase reverb by 20%"

Electron sends query to Flask

Flask parses and maps query to the corresponding VST knob (e.g., Reverb_WetLevel)

VST parameter is adjusted in real-time
