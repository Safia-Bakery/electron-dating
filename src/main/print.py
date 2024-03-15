import sys
import json
import win32print

# Retrieve parameters passed from JavaScript
options = json.loads(sys.argv[1])

# Extract device name and number of copies from options
device_name = options.get('deviceName')
num_copies = options.get('copies', 1)  # Default to 1 copy if not provided

# Modify the ZPL code to include device name
zpl_code = f"""
^XA 
^MMT
^PW400
^LL800  // Increased label length to 800 dots
^LS0 
^FO50,20  // Moved the starting position down to 150 dots
^A0N,60,60  // Increased font size to 60 dots
^FDProduct {device_name}^FS 
^FO80,30  // Moved down to 250 dots
^BQN,2,9  // QR code command. Format 2 specifies QR code, and the data is encoded as ASCII
^FDMM,AWhats up mother fuckers^FS  // MM: Mode - A: Alphanumeric. You can adjust the mode based on your data type.
^FO50,450  // Moved down to 450 dots
^A0N,40,40  // Increased font size to 40 dots
^FDPrice: $19.99^FS 
^XZ
"""

# Get your Godex printer's EXACT name from Windows settings
printer_name = "Godex G530"  # Replace with the actual name

print("Received parameters from JavaScript:", )   
# Open the printer
hPrinter = win32print.OpenPrinter(printer_name) 
try:
    for _ in range(num_copies):
        # Start a print job
        hJob = win32print.StartDocPrinter(hPrinter, 1, (f"ZPL Label - Copy{_+1}", None, "RAW"))
        try:
            win32print.StartPagePrinter(hPrinter)
            # Write ZPL code to the printer
            win32print.WritePrinter(hPrinter, zpl_code.encode())
            win32print.EndPagePrinter(hPrinter)
        finally:
            # End the print job
            win32print.EndDocPrinter(hPrinter)
finally:
    # Close the printer
    win32print.ClosePrinter(hPrinter)
