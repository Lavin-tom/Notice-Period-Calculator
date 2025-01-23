        function calculateEndDate() {
            const startDate = new Date(document.getElementById("startDate").value);
            const noticePeriod = parseInt(document.getElementById("noticePeriod").value) || 0;
            const holidays = parseInt(document.getElementById("holidays").value) || 0;

            const addSaturday = document.getElementById("addSaturday").checked;
            const addSunday = document.getElementById("addSunday").checked;

            if (!startDate || isNaN(noticePeriod) || noticePeriod <= 0) {
                document.getElementById("result").innerHTML = "<strong>Please enter a valid start date and notice period.</strong>";
                return;
            }

            let totalDaysToAdd = noticePeriod + holidays;
            let currentDate = new Date(startDate);

            let daysAdded = 0;
            while (daysAdded < totalDaysToAdd) {
                currentDate.setDate(currentDate.getDate() + 1);

                const dayOfWeek = currentDate.getDay();

                if ((addSaturday || dayOfWeek !== 6) && (addSunday || dayOfWeek !== 0)) {
                    daysAdded++;
                }
            }

            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(currentDate);

            const result = `
                Start Date: ${formattedStartDate} <br>
                End Date of Notice Period: ${formattedEndDate}<br>
            `;

            document.getElementById("result").innerHTML = result;
        }

        function formatDate(date) {
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            
            let daySuffix = 'th';
            if (day === 1 || day === 21 || day === 31) daySuffix = 'st';
            else if (day === 2 || day === 22) daySuffix = 'nd';
            else if (day === 3 || day === 23) daySuffix = 'rd';

            return `${day}${daySuffix} ${month} ${year}`;
        }