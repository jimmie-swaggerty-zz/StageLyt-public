import React from 'react'
const Footer = () => {

  return (
    <footer class="text-center text-lg-start bg-purple text-light">
      <section class="p-1">
        <div class="container text-center text-md-start mt-5">
          {/* <!-- Grid row --> */}
          <div class="row mt-3">
            {/* <!-- Grid column --> */}
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* <!-- Content --> */}
              <h6 class="text-uppercase fw-bold mb-4">
                Book, Diva!
              </h6>
              <p>
                Welcome to the first app for performers by performers
              </p>
            </div>
            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}
            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* <!-- Links --> */}
              <h6 class="text-uppercase fw-bold mb-4">
                Create
              </h6>
              <p>
                <a href="/dashboard/pages/new" class="text-reset">Pages</a>
              </p>
              <p>
                <a href="/dashboard/events/new" class="text-reset">Events</a>
              </p>
            </div>
            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}
            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* <!-- Links --> */}
              <h6 class="text-uppercase fw-bold mb-4">
                Information
              </h6>
              <p>
                <a href="#!" class="text-reset">About Us</a>
              </p>
              <p>
                <a href="#!" class="text-reset">FAQ</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Terms and Conditions</a>
              </p>
            </div>
            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* <!-- Links --> */}
              <h6 class="text-uppercase fw-bold mb-4">
                Users
              </h6>
              <p>
                <a href="/dashboard" class="text-reset">Dashboard</a>
              </p>
            </div>
            {/* <!-- Grid column --> */}
          </div>
          {/* <!-- Grid row --> */}
        </div>
      </section>
      {/* <!-- Section: Links  --> */}

      {/* <!-- Copyright --> */}
      <div className="text-center p-4 bg-purple">
        {/* © 2021 Copyright:&nbsp; */}
        Created by&nbsp;<a className="text-reset fw-bold text-decoration-none" href="https://QueerCoded.net/" target="_blank">Jimmie Swaggerty</a>
      </div>
      {/* <!-- Copyright --> */}
    </footer>
  )
}

export default Footer