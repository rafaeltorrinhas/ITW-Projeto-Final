const composedUri = "http://192.168.160.58/NBA/api/statistics/NumPlayersBySeason";

$('document').ready(function () {
    const ctx = document.getElementById('myChart');

    ajaxHelper(composedUri, 'GET').done(function (stats) {
        // Interact with the data returned
        var myLabels = [];
        var regularSeasonData = [];
        var playoffsData = [];
        $.each(stats, function (index, item) {
            myLabels.push(item.Season);
            if (item.SeasonType === "Regular Season") {
                regularSeasonData.push(item.Players);
                playoffsData.push(null); // Placeholder for playoffs if data is not available
            } else if (item.SeasonType === "Playoffs") {
                playoffsData.push(item.Players);
                regularSeasonData.push(null); // Placeholder for regular season if data is not available
            }
        })

        // Instantiate and draw our chart, passing in some options.
        new Chart(ctx, {
            type: 'bar',
            title: 'olá',
            data: {
                labels: myLabels,
                datasets: [{
                    label: 'Regular Season',
                    data: regularSeasonData,
                    backgroundColor: 'cornflowerblue', // Set the color for Regular Season
                    borderWidth: 1
                }, {
                    label: 'Playoffs Season',
                    data: playoffsData,
                    backgroundColor: 'lightcoral', // Set the color for Playoffs Season
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: { align: 'start', font: { family: 'Open Sans' } },
                        title: {
                            display: true, text: ['General Statistics', '# Players per season'], padding: { top: 10, bottom: 10 }, font: { size: 12, family: 'Open Sans' }
                        },
                    }
                },
                indexAxis: 'y',
                scales: {
                    x: {
                        ticks: {
                            font: { family: 'Open Sans', color: '#87cefa' } ,
                        }
                    },
                    y: {
                        beginAtZero: true, 
                        ticks: {
                            font: { family: 'Open Sans', color: '#87cefa', size: 8, width: 200 } ,
                        }
                    }
                }
            }
        });
    });
});

//--- Internal functions
function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
        }
    });
}
