document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Load saved state and apply initial styles
    checkboxes.forEach(checkbox => {
        checkbox.checked = localStorage.getItem(checkbox.id) === 'true';
        updateLabelStyle(checkbox); // Apply initial style based on saved state

        // Save state on change
        checkbox.addEventListener('change', () => {
            localStorage.setItem(checkbox.id, checkbox.checked);
            updatePercentages(); // Update percentages when checkbox state changes
            updateLabelStyle(checkbox); // Update label style based on checkbox state
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
            let matchCount = 0;
            let firstMatchElement = null;
            content.forEach(element => {
                const matches = highlightSearchTerm(element, searchTerm);
                matchCount += matches;
                if (matches > 0 && !firstMatchElement) {
                    firstMatchElement = element.querySelector('.highlight');
                }
            });

            // Display the number of matches
            displayMatchCount(matchCount);

            // Navigate to the first match
            if (firstMatchElement) {
                firstMatchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    function highlightSearchTerm(element, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const originalHTML = element.innerHTML;
        element.innerHTML = originalHTML.replace(regex, '<span class="highlight">$1</span>');
        const matches = (originalHTML.match(regex) || []).length;
        console.log("Element HTML after highlighting:", element.innerHTML); // Log the HTML after highlighting
        return matches;
    }

    function clearHighlights(elements) {
        elements.forEach(element => {
            element.innerHTML = element.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
        });
    }

    function displayMatchCount(count) {
        let matchCountElement = document.getElementById('matchCount');
        if (!matchCountElement) {
            matchCountElement = document.createElement('div');
            matchCountElement.id = 'matchCount';
            document.body.appendChild(matchCountElement);
        }
        matchCountElement.textContent = `Matches found: ${count}`;
    }

    // Function to update percentages for all learning outcomes
    function updatePercentages() {
        updatePercentage('learning-outcome-1');
        updatePercentage('learning-outcome-2');
        updatePercentage('learning-outcome-3');
        updatePercentage('learning-outcome-4');
        updatePercentage('learning-outcome-5');
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

    // Function to update the style of the label based on checkbox state
    function updateLabelStyle(checkbox) {
        const criteria = checkbox.closest('.criteria'); // Get the closest parent with class "criteria"
        if (criteria) {
            const explanation = criteria.querySelector('.criteria-explanation');
            if (explanation) {
                if (checkbox.checked) {
                    explanation.classList.add('strike-through');
                } else {
                    explanation.classList.remove('strike-through');
                }
            }
        }
    }
});
