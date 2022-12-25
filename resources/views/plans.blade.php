<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
    @if (Auth::user()->subscribed())
        <p class="alert alert-danger">you are already subscribed</p>
    @endif
    
    <div class="container" style="margin-top: 120px">
        <div class="row justify-content-center">
          @if(session()->has('success'))
            <div class="alert alert-success">
                {{ session()->get('success') }}
            </div>
          @endif
            <div class="col-md-10">
                <div class="card border-3">
                    <div class="card-header">Select Plan:</div>
     
                    <div class="card-body">
     
                        <div class="row">
                            @foreach($plans as $plan)
                                <div class="col-md-6 mt-0 ">
                                    <div class="card mb-3 border-bottom-0 border-top-0 border-right-0">
                                      <div class="card-header fs-4"> 
                                            ${{ $plan->price }}
                                      </div>
                                      <div class="card-body">
                                        <h5 class="card-title">{{ $plan->name }}</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      
                                        <a href="{{ route('plans.show', $plan->slug) }}" class="btn btn-primary pull-right">Choose</a>
      
                                      </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
      
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    -->
  </body>
</html>