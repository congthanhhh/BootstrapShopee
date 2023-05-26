
var indexCart = 0;
var app = angular.module("myapp", ["ngRoute"]);
app.controller("myCtrl", function ($scope, $rootScope, $routeParams, $http) {
    // Thêm sản phẩm
    $scope.addCart = function (p) {
        if (typeof $rootScope.cart == 'undefined') {
            $rootScope.cart = [];
        };
        $scope.countCart = $rootScope.cart.length;
        if ($rootScope.cart.filter(i => i.id == p.id).length == 0) {
            $rootScope.cart.push(p);
            $rootScope.cart[$scope.countCart].quantity = 1;
        }
    }
    $rootScope.sumMoney = 0;
    //Tính tổng tiền bên giỏ hàng
    if (typeof $rootScope.cart != 'undefined') { //Có giỏ hàng mới tính tổng
        for (var i = 0; i < $rootScope.cart.length; i++) {
            $rootScope.sumMoney = $rootScope.sumMoney + $rootScope.cart[i].quantity * $rootScope.cart[i].Price;
        }
    }
    //Nhấn nút Cộng để thêm sản phẩm
    $scope.addClick = function (index) {
        $rootScope.cart[index].quantity = $rootScope.cart[index].quantity + 1;
        if (typeof $rootScope.cart != 'undefined') {
            $rootScope.sumMoney = 0;
            for (var i = 0; i < $rootScope.cart.length; i++) {
                $rootScope.sumMoney = $rootScope.sumMoney + $rootScope.cart[i].quantity * $rootScope.cart[i].Price;
            }
        }
    }
    $scope.subClick = function (index) {
        $rootScope.cart[index].quantity = $rootScope.cart[index].quantity - 1;
        if (typeof $rootScope.cart != 'undefined') {
            $rootScope.sumMoney = 0;
            for (var i = 0; i < $rootScope.cart.length; i++) {
                $rootScope.sumMoney = $rootScope.sumMoney + $rootScope.cart[i].quantity * $rootScope.cart[i].Price;
            }
        }
    }
    //Xóa sản phẩm trong giỏ hàng
    $scope.delProduct = function (index) {
        $rootScope.cart.splice(index, 1);
        if (typeof $rootScope.cart != 'undefined') {
            $rootScope.sumMoney = 0;
            for (var i = 0; i < $rootScope.cart.length; i++) {
                $rootScope.sumMoney = $rootScope.sumMoney + $rootScope.cart[i].quantity * $rootScope.cart[i].Price;
            }
        }
    }
    
    $scope.products = [];
    $http.get('products.json').then(function (reponse) {
        $scope.products = reponse.data;
    })
    //Truyền tham số index từ trang chủ đến trang sản phẩm chi tiết
    $scope.index = $routeParams.url;

    // Xem them
    $rootScope.limitNumber=48;
    $rootScope.isMoreProduct = true;
    $scope.xemthem = function () {
        $rootScope.limitNumber=96;
        $rootScope.isMoreProduct = false;
    }
    $scope.anbot = function () {
        $rootScope.limitNumber=48;
        $rootScope.isMoreProduct = true;
    }
    //  xắp xép tăng giảm
    $scope.sort='Price';
    $scope.tang=function(){
        $scope.sort='Price';
    }
    $scope.giam=function(){
        $scope.sort='-Price';
    }
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/detail/:url", {
            templateUrl: "detailProduct.html?" + Math.random(),
            controller: "myCtrl"
        })
        .when("/cart", {
            templateUrl: "cart.html?" + Math.random(),
            controller: "myCtrl"
        })
        .when("/home", {
            templateUrl: "listProduct.html?" + Math.random(),
            controller: "myCtrl"
        })
        .otherwise({
            // templateUrl: "listProduct.html",
            redirectTo: "/home",
            controller: "myCtrl"
        })
});

