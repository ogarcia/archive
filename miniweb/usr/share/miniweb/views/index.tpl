<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>{{get('hostname', 'MiniWeb')}} mini control</title>

		<!-- Bootstrap -->
		<link href="css/bootstrap.min.css" rel="stylesheet">

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
			<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>

	<body>
		<div class="container">
			<div class="page-header text-center">
				<h1>{{get('hostname', 'MiniWeb')}}</h1>
			</div>
			<div class="well well-lg">
			%for button in buttons:
				<a class="btn btn-default btn-lg btn-block {{button[0]}}"
					href="/action/{{button[1]}}" role="button">{{button[2]}}</a>
			%end
			</div>
		</div>
	</body>
</html>
