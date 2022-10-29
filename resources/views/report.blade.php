<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <small>Report Issued at: {{$date}} </small>
    <hr>
    <h1>QuicB Business analysis report</h1>
    <p>Total accumalated revenue: {{$totalRevenue}}</p>
    <p>Total recorded expenses: {{$totalExpenses}}</p>
    <p>Total registered users: {{$totalUsers}}</p>
    <p>Total subscribed users: {{$totalSubscribers}}</p>
    <hr>
    <p><b>Profit earned: {{$totalRevenue - $totalExpenses }}</b></p>
    <p><b>Ratio of Subscribers to Customers: 1 to {{ $totalUsers/$totalSubscribers}} times</b></p>
    
</body>
</html>