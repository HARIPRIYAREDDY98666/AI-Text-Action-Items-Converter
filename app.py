import http.server
import socketserver
import webbrowser
import os
import sys

# Configuration
PORT = 8000
# Change this if your login file is named 'login.html' instead of 'index.html'
START_PAGE = "login.html" 

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    # This ensures files are served correctly from the current folder
    def log_message(self, format, *args):
        # Optional: Override to clean up console output, or leave default
        sys.stderr.write("%s - - [%s] %s\n" %
                         (self.client_address[0],
                          self.log_date_time_string(),
                          format%args))

def run_server():
    # Check if the start page exists to avoid confusion
    if not os.path.exists(START_PAGE):
        print(f"⚠️  Warning: '{START_PAGE}' not found. ?")
    
    # Set up the server
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        url = f"http://localhost:{PORT}/{START_PAGE}"
        
        print("-" * 40)
        print(f"🚀 AI Task Manager is running!")
        print(f"🌍 Open your browser at: {url}")
        print("-" * 40)
        print("Press Ctrl+C to stop the server.")
        
        # Automatically open the web browser
        webbrowser.open(url)
        
        # Keep the server running
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped.")
            httpd.server_close()

if __name__ == "__main__":
    run_server()