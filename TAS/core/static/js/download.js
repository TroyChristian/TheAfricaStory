function downloadPreview() {
    var link = document.createElement('a');
    link.href = '/static/preview/TheAfricaStory_preview_pdf.pdf';
    link.download = 'TheAfricaStory_preview.pdf'; // This suggests the filename to save as
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
} 

function downloadEbook() {
    window.open('/download-ebook', '_blank');
    setTimeout(function() {
        fetch('/unset-session-variable')
        .then(response => response.json()) // Assuming the response is JSON. Adjust accordingly.
        .then(data => {
            console.log(data); // Log or handle the response data
            window.location.href = '/';
        })
        .catch(error => console.error('Error:', error));
    }, 1000); // Adjust the delay as needed
}