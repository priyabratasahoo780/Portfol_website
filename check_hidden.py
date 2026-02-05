
import string

def check_hidden(file_path):
    printable = string.printable
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    for i, line in enumerate(lines):
        line_num = i + 1
        for char in line:
            if char not in printable and char != '\ufeff': # Ignore BOM if present at start (though typically read transparently)
                # Check for specific invisible chars
                # We interpret 'printable' which includes newline variants.
                print(f"Line {line_num}: contains non-printable char code {ord(char)}")

check_hidden(r'c:\Users\priyabrata\Desktop\Portfol\src\index.css')
