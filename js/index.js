var benfordValues = [0.301, 0.176, 0.125, 0.097, 0.079, 0.067, 0.058, 0.051, 0.046];
var labels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var textData = document.getElementById('textData');

var benfordCanvas = document.getElementById('benfordChart').getContext('2d');
var benfordChart = new Chart(benfordCanvas, {
    type: 'line',
    data: {
        labels,
        datasets: [{
            label: 'Data',
            data: [],
            borderColor: '#dc3545',
            borderWidth: 2,
            backgroundColor: 'transparent',
        },
        {
            label: 'Benford',
            data: benfordValues.map(function (x) { return x * 100; }),
            borderColor: '#007bff',
            borderWidth: 2,
            backgroundColor: 'transparent',
        }],
    },
});

function updateChart() {
    var data = textData.value.split(',')
        .map(function (x) { return x.trim(); })
        .filter(function (x) {
            return /(^[1-9])/g.test(x);
        });
    var results = {};
    labels.forEach(function (x) {
        results[x] = 0;
    });
    data.forEach(function (x) {
        var first = x.substring(0, 1);
        if (Object.values(labels).includes(+first)) {
            results[first] = results[first] + 1;
        }
    });
    benfordChart.data.datasets[0].data = Object.keys(results).map(function (x) {
        return (results[x] / data.length).toFixed(3) * 100;
    });
    benfordChart.update();
}
