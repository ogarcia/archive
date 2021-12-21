<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>{{get('hostname', 'MiniWeb')}} mini control</title>

		<!-- Bootstrap -->
		<link href="/css/bootstrap.min.css" rel="stylesheet">

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
				<h1>{{get('title', 'MiniWeb')}}</h1>
			</div>
			%if status == 'success':
			<div class="panel panel-success">
				<div class="panel-heading">
					<h3 class="panel-title">Process executed suscesfully</h3>
				</div>
			%else:
			<div class="panel panel-danger">
				<div class="panel-heading">
					<h3 class="panel-title">Process failure</h3>
				</div>
			%end
				<div class="panel-body">
					%if status == 'danger':
					<p>One or more processes have failed and the order was not
						properly executed.</p>
					%if defined('info'):
					<pre>{{info}}</pre>
					%end
					%else:
					All commands have been properly executed.
					%end
				</div>
			</div>
			<div class="well well-lg">
				<a class="btn btn-default btn-lg btn-block btn-success" href="/" role="button">Return</a>
			</div>
		</div>
	</body>
</html>
