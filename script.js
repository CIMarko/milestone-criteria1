document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Load saved state
    checkboxes.forEach(checkbox => {
        checkbox.checked = localStorage.getItem(checkbox.id) === 'true';

        // Save state on change
        checkbox.addEventListener('change', () => {
            localStorage.setItem(checkbox.id, checkbox.checked);
            updatePercentages(); // Update percentages when checkbox state changes
        });
    });

    // Initial update of percentages
    updatePercentages();

    // Search functionality
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting

        // Get the search term
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        console.log("Search Term:", searchTerm); // Log the search term

        // Get all the content on the page
        const content = document.querySelectorAll('main, section, p, h1, h2, h3, h4, h5, h6');
        console.log("Content:", content); // Log the content elements

        // Clear previous highlights
        clearHighlights(content);

        // Search and highlight the content
        if (searchTerm) {
            content.forEach(element => highlightSearchTerm(element, searchTerm));
        }
    });

    function highlightSearchTerm(element, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        element.innerHTML = element.innerHTML.replace(regex, '<span class="highlight">$1</span>');
        console.log("Element HTML after highlighting:", element.innerHTML); // Log the HTML after highlighting
    }

    function clearHighlights(elements) {
        elements.forEach(element => {
            element.innerHTML = element.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
        });
    }

    // Function to update percentages for all learning outcomes
    function updatePercentages() {
        updatePercentage('learning-outcome-1');
        updatePercentage('learning-outcome-2');
        updatePercentage('learning-outcome-3');
    }

    function updatePercentage(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const checkboxes = section.querySelectorAll('input[type="checkbox"]');
        const checked = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
        const total = checkboxes.length;
        const percentage = (checked / total * 100).toFixed(2);
        const percentageElement = document.getElementById(`percentage-${sectionId}`);
        if (percentageElement) {
            percentageElement.textContent = `Completion: ${percentage}%`;
        }
    }
});
