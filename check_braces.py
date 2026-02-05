
import re

def check_braces(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    # Remove comments to avoid false positives
    # CSS comments are /* ... */
    # We'll replace them with spaces to preserve line numbers, ideally, but simple removal is easier for checking balance.
    # To preserve line numbers, we can replace non-newline chars in comments with spaces.
    
    def replacer(match):
        return re.sub(r'[^\n]', ' ', match.group(0))
    
    content_no_comments = re.sub(r'/\*[\s\S]*?\*/', replacer, content)

    lines = content_no_comments.split('\n')
    
    stack = []
    
    for i, line in enumerate(lines):
        line_num = i + 1
        for char in line:
            if char == '{':
                stack.append(line_num)
            elif char == '}':
                if not stack:
                    print(f"Error: Unexpected '}}' at line {line_num}")
                    return
                stack.pop()

    if stack:
        print(f"Error: Unclosed '{{' starting at line {stack[-1]}")
    else:
        print("Braces are balanced.")

check_braces(r'c:\Users\priyabrata\Desktop\Portfol\src\index.css')
