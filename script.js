// Add interactive JavaScript functionality here
document.addEventListener('DOMContentLoaded', function () {
    console.log('Website loaded!');
});
<script>
        // Function to open the modal
        function openModal(src) {
            document.getElementById("myModal").style.display = "block";
            document.getElementById("img01").src = src;
        }

        // Function to close the modal
        function closeModal() {
            document.getElementById("myModal").style.display = "none";
        }

        // Close the modal when clicking outside of the image
        window.onclick = function (event) {
            const modal = document.getElementById("myModal");
            if (event.target === modal) {
                closeModal();
            }
        }
</script>