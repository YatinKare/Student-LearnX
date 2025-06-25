import mimetypes


def guess_mime_type(filename):
    mime, _ = mimetypes.guess_type(filename)
    return mime or "application/octet-stream"
