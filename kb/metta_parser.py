import re

def parse_metta_line(line):
    line = line.strip()
    if not line or line.startswith(';'):
        return None

    # Basic S-expression parsing
    # This is a simplified parser and might need to be more robust for complex MeTTa syntax
    match = re.match(r'\((\w+)\s+(.*)\)', line)
    if match:
        tag = match.group(1)
        content = match.group(2)
        # Further parse content based on tag
        return {"tag": tag, "content": content}
    return None

def load_metta_file(filepath):
    data = []
    with open(filepath, 'r') as f:
        for line in f:
            parsed = parse_metta_line(line)
            if parsed:
                data.append(parsed)
    return data

if __name__ == '__main__':
    # Example usage (assuming marketplace.metta is in the parent directory)
    metta_data = load_metta_file('../marketplace.metta')
    for item in metta_data:
        print(item)