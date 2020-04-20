<?php
require_once '../connection.php';

if (isset($_POST['signin'])) {
    $response = db_signin($_POST['username'], $_POST['password']);
}

?>
<!doctype html>
<html lang="en" class="h-100">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <!-- FontAwesome CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../css/style.css">
    <title>Banko Game</title>
</head>

<body class="h-100">
    <header role="navbar">
        <nav class="navbar bg-white fixed-top">
            <div class="navbar-brand ">
                <img src="../images/Banko.svg" height="30" alt="">
            </div>
            
            <div class="ok">
            <button class="btn btn-dark" onclick="shuffle()">Shuffle</button>
            <a class="btn px-3 btn-outline-danger" href="signout.php">Sign Out</a></div>
        </nav>
    </header>
    <main class="h-100 d-flex">
        <section class="flex-fill align-self-center">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-6 offset-sm-3 ">
                        <div class="card py-4 rounded-xl">
                            <div class="container-fluid">
                                <div class="row ">
                                    <div class="col-sm-12 px-4">
                                        <div class="deck my-3 mt-4 d-flex justify-content-center" id="deck">

                                        </div>
                                    </div>
                                </div>
                                <div class="row my-2">
                                    <div class="col-sm-7 d-flex flex-column justify-content-center">
                                        <div class="text-center text-muted mb-1">
                                            BET AMOUNT
                                        </div>
                                        <div class="d-flex flex-row justify-content-center">
                                            <button type="button" class="btn btn-outline-primary rounded-circle" onclick="subScore(this)" id="sub">
                                                <i class="fa fa-caret-down fa-lg"></i>
                                            </button>
                                            <button type="button" class="btn btn-info rounded-pill px-4 py-2 mx-3" id="pot">0</button>
                                            <button type="button" class="btn btn-outline-primary rounded-circle" onclick="addScore(this)" id="add">
                                                <i class="fa fa-caret-up fa-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-sm-5 d-flex flex-column">
                                        <div class="text-center text-muted mb-1">
                                            POT AMOUNT
                                        </div>
                                        <div class="d-flex flex-row justify-content-center">
                                            <button type="button" class="btn btn-success rounded-pill px-4 py-2 mx-3" id="pot">0</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 my-3 mt-4 d-flex justify-content-around">
                                        <button type="button" class="btn btn-warning px-3">Pass</button>
                                        <button type="button" class="btn btn-dark px-3">Bet</button>
                                        <button type="button" class="btn btn-danger px-3">Banco</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="col-md-3 pt-5">
                        <div class="float-right d-md-none">
                            <button type="button" class="btn btn-dark px-3">View Board</button>
                        </div>
                        <table class="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>100</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>200</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>500</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> -->
                </div>
            </div>
        </section>
    </main>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script> -->
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="../js/main.js"></script>

</body>

</html>