const mainQueue = document.getElementById("main-queue");
mainQueue.classList.add("container");
mainQueue.classList.add("main-queue");

mainQueue.innerHTML = `
    <div class="row mb-5">
        <div class="col-md-8 mb-5">
            <div class="counter-status">
                <div class="row px-3 py-4">
                    <div class="col-md-7">
                        <div class="running-serial text-center">
                            <div class="running-serial-no">
                                <h1 class="serial-no">83</h1>
                            </div>
                            <div class="counter-no">
                                <h2 class="m-0 pb-5">counter no: 06</h2>
                            </div>
                        </div>
                        <div class="queue-info my-5">
                            <div class="row justify-content-center align-items-center">
                                <div class="qr-code-image col-4">
                                    <img src="https://img.freepik.com/free-vector/vector-qr-code-sample-isolated_255502-275.jpg?size=338&ext=jpg" alt="" />
                                </div>
                                <div class="this-queue-info col-8">
                                    <h4>This Queue Title This Queue Title</h4>
                                    <h3 class="fw-bolder text-secondary">abc-def-ghij</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 px- 2 py-3 in-service-area mt-md-0 mt-sm-4">
                        <h3 class="text-center in-service">In Service</h3>
                            <div class="mx-2">
                                <h4>Rayhan</h4>
                                <h4>Tawhid</h4>
                                <h4>Meraj</h4>
                                <h4>Meraj</h4>
                                <h4>Meraj</h4>
                                <h4>Meraj</h4>
                            </div>
                    </div>
                </div>
            </div>
            <div class="notice-area mt-4">
                <div class="row justify-content-center align-items-center px-3 ">
                    <div class="col-3 py-3 notice-time"><h3>02:45 PM</h3></div>
                    <div class="col-9 py-3 notice-details"><h3 class="fw-bolder">Lunch Break Till 03:00 PM</h3></div>
                </div>
            </div>
        </div>
        <div class="col-md-4 people-waitng px-3 py-4">
            <h3 class="text-center py-3">People Waiting</h3>
            <div class="mx-2">
                <h4>Rayhan</h4>
                <h4>Tawhid</h4>
                <h4>Meraj</h4>
                <h4>Meraj</h4>
                <h4>Meraj</h4>
                <h4>Meraj</h4>
            </div>
        </div>
    </div>
`;