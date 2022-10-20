// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Customers" titleTo="customers" buttonLabel="New Customer" buttonTo="newCustomer">
        <Route path="/customers/new" page={CustomerNewCustomerPage} name="newCustomer" />
        <Route path="/customers/{id:Int}/edit" page={CustomerEditCustomerPage} name="editCustomer" />
        <Route path="/customers/{id:Int}" page={CustomerCustomerPage} name="customer" />
        <Route path="/customers" page={CustomerCustomersPage} name="customers" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Jobs" titleTo="jobs" buttonLabel="New Job" buttonTo="newJob">
        <Route path="/jobs/new" page={JobNewJobPage} name="newJob" />
        <Route path="/jobs/{id:Int}/edit" page={JobEditJobPage} name="editJob" />
        <Route path="/jobs/{id:Int}" page={JobJobPage} name="job" />
        <Route path="/jobs" page={JobJobsPage} name="jobs" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
