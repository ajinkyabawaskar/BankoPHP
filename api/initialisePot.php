<?php
require '../connection.php';
$request_method = $_SERVER['REQUEST_METHOD'];
$response = array();
switch ($request_method) {
    case 'GET':
        response(doGet());
        break;
    case 'POST':
        doPost();
        break;
    case 'DELETE':
        doDelete();
        break;
    case 'PUT':
        doPut();
        break;

    default:
        # code...
        break;
}

function doGet()
{
    $response2 = false;
    if (@$_GET['roomID']) {

        @$roomID = db_quote($_GET['roomID']);
        $query = "SELECT username,amount FROM `accounts` WHERE `roomID` =" . $roomID;
        $response = db_select($query);

        for ($i = 0; $i < count($response); $i++) {
            //print_r($response[$i]["username"]);
            $username = db_quote($response[$i]["username"]);
            $amount = db_quote(intval($response[$i]["amount"]) - 10);
            $query = "UPDATE `accounts` SET `amount` = " . $amount . " WHERE `username`=" . $username;
            $response2 = db_query($query);
        }
        $potBalance = count($response) * 10;
        $query = "UPDATE `rooms` SET `potBalance`=" . $potBalance . " WHERE `roomID`=" . $roomID;
        $response2 = db_query($query);
    }
    return $response2;
}

function doPost()
{
}
function doDelete()
{
}
function doPut()
{
}

function response($x)
{
    header('Content-Type: application/json');
    echo json_encode($x);
}
