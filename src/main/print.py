import win32print
import sys

# Receive parameters passed from JavaScript
params = sys.argv[1:]

print("Received parameters from JavaScript:", params)

# Your ZPL code 
zpl_code = """
^XA 
^MMT
^PW400
^LL800  // Increased label length to 800 dots
^LS0 
^FO50,20  // Moved the starting position down to 150 dots
^A0N,60,60  // Increased font size to 60 dots
^FDProduct Name^FS 
^FO70,20  // Moved down to 250 dots
^BQN,2,9  // QR code command. Format 2 specifies QR code, and the data is encoded as ASCII
^FDMM,AWhats up mother fuckers^FS  // MM: Mode - A: Alphanumeric. You can adjust the mode based on your data type.
^FO50,450  // Moved down to 450 dots
^A0N,40,40  // Increased font size to 40 dots
^FDPrice: $19.99^FS 
^XZ
"""

# Get your Godex printer's EXACT name from Windows settings
printer_name = "Godex G530"  # Replace with the actual name

# Open the printer
hPrinter = win32print.OpenPrinter(printer_name)
try:
    # Start a print job
    hJob = win32print.StartDocPrinter(hPrinter, 1, ("ZPL Label", None, "RAW"))
    try:
        win32print.StartPagePrinter(hPrinter)
        # Write ZPL code to the printer
        win32print.WritePrinter(hPrinter, zpl_code.encode())
        win32print.EndPagePrinter(hPrinter)
        
        # Additional steps to attempt to resolve the issue
        
        # Reset printer
        win32print.SetPrinter(hPrinter, 2, None, 0)
        
        # Calibrate printer (if applicable)
        # Instructions for calibration may vary depending on the printer model
        
    finally:
        # End the print job
        win32print.EndDocPrinter(hPrinter)
finally:
    # Close the printer
    win32print.ClosePrinter(hPrinter)