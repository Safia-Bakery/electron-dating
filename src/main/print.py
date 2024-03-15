import win32print
import sys
import json

# Retrieve parameters passed from JavaScript
options = json.loads(sys.argv[1])

# Extract device name from options
device_name = options.get('deviceName', 'Unknown Device')

# Modify the ZPL code to include device name
zpl_code = f"""
^XA 
^MMT
^PW400
^LL800
^LS0 
^FO50,20
^A0N,60,60
^FDProduct Name: {device_name}^FS
^FO70,25
^BQN,2,9
^FDMM,AWhats up mother fu*kers^FS
^FO50,450
^A0N,40,40
^FDPrice: $19.99^FS
^XZ
"""

# Get your Godex printer's EXACT name from Windows settings
printer_name = "Godex G530"  # Replace with the actual name

print("Received parameters from JavaScript:", )   
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