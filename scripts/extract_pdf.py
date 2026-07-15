import os
import sys

def extract_pdf_text(pdf_path, output_txt_path):
    print(f"Starting extraction from: {pdf_path}")
    if not os.path.exists(pdf_path):
        print(f"Error: PDF file not found at {pdf_path}")
        return False
    
    try:
        from pypdf import PdfReader
    except ImportError:
        print("Error: The 'pypdf' package is not installed.")
        print("Please run: pip install pypdf")
        return False

    try:
        reader = PdfReader(pdf_path)
        total_pages = len(reader.pages)
        print(f"Found {total_pages} pages in PDF.")
        
        extracted_text = []
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            if text:
                extracted_text.append(f"--- PAGE {i + 1} ---\n{text}\n")
            else:
                extracted_text.append(f"--- PAGE {i + 1} ---\n[No extractable text on this page]\n")
            print(f"Extracted page {i + 1}/{total_pages}")
            
        os.makedirs(os.path.dirname(output_txt_path), exist_ok=True)
        with open(output_txt_path, "w", encoding="utf-8") as f:
            f.write("\n".join(extracted_text))
            
        print(f"Successfully saved extracted text to: {output_txt_path}")
        return True
        
    except Exception as e:
        print(f"An error occurred during extraction: {e}")
        return False

if __name__ == "__main__":
    # Default paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    default_pdf = os.path.join(base_dir, "docs", "第一章.pdf")
    default_output = os.path.join(base_dir, "docs", "第一章_text.txt")
    
    pdf_input = sys.argv[1] if len(sys.argv) > 1 else default_pdf
    txt_output = sys.argv[2] if len(sys.argv) > 2 else default_output
    
    success = extract_pdf_text(pdf_input, txt_output)
    sys.exit(0 if success else 1)
