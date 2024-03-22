document.getElementById('submitBtn').addEventListener('click', () => {
    const selectedClass = document.getElementById('class').value;
    if (selectedClass) {
        fetch(`data/${selectedClass}.txt`)
            .then(response => response.text())
            .then(data => {
                const rows = data.split('\n');
                const tbody = document.getElementById('tableBody');
                tbody.innerHTML = '';

                rows.forEach(row => {
                    const values = row.split(',');
                    const tr = document.createElement('tr');

                    let totalMarks = 0;
                    values.forEach((value, index) => {
                        const td = document.createElement('td');
                        td.textContent = value;
                        tr.appendChild(td);

                        // Calculate total marks (excluding Roll No and Name)
                        if (index > 1) {
                            totalMarks += parseInt(value) || 0; // Convert value to integer or default to 0
                        }
                    });

                    // Calculate percentage
                    const percentage = (totalMarks / ((values.length - 2) * 100)) * 100;

                    // Append total marks and percentage to the row
                    const totalMarksTd = document.createElement('td');
                    totalMarksTd.textContent = totalMarks;
                    tr.appendChild(totalMarksTd);

                    const percentageTd = document.createElement('td');
                    percentageTd.textContent = percentage.toFixed(2) + '%';
                    tr.appendChild(percentageTd);

                    tbody.appendChild(tr);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        alert('Please select a class.');
    }
});
