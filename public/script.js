document.addEventListener("DOMContentLoaded", function() {
    // Check if we are on the index page
    if (document.title === "Customer Master") {
        fetchCustomers();

        // Add event listener for the add customer button
        document.getElementById('addCustomer').addEventListener('click', function() {
            window.location.href = 'create-customer.html'; // Redirect to create customer page
        });
    }

    // Check if we are on the create customer page
    if (document.title === "Create Customer") {
        const urlParams = new URLSearchParams(window.location.search);
        const customerId = urlParams.get('id');
        if (customerId) {
            fetchCustomerData(customerId); // Fetch existing customer data for editing
        }

        // Handle form submission for creating or updating customer
        const form = document.getElementById('customerForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const customerData = new FormData(form);
            if (customerId) {
                updateCustomer(customerId, customerData); // Update existing customer
            } else {
                createCustomer(customerData); // Create new customer
            }
        });
    }
});

// Function to fetch customers from the database
function fetchCustomers() {
    fetch('/api/customers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(customers => {
            const customerTableBody = document.querySelector('#customer-table tbody');
            customerTableBody.innerHTML = ''; // Clear previous data
            customers.forEach(customer => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${customer.id}</td>
                    <td>${customer.customerCode}</td>
                    <td>${customer.customerName}</td>
                    <td>${customer.city || 'N/A'}</td>
                    <td>${customer.country || 'N/A'}</td>
                    <td>${customer.isActive ? 'Active' : 'Inactive'}</td>
                    <td>
                        <button class="btn btn-link" onclick="editCustomer(${customer.id})">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-link text-danger" onclick="deleteCustomer(${customer.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                customerTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
}

// Function to fetch a single customer data for editing
function fetchCustomerData(id) {
    fetch(`/api/customers/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(customer => {
            const form = document.getElementById('customerForm');
            // Populate the form fields with the customer data
            form.customerName.value = customer.customerName || '';
            form.customerCode.value = customer.customerCode || '';
            form.groupCustomerCode.value = customer.groupCustomerCode || '';
            form.customerType.value = customer.customerType || '';
            form.segment.value = customer.segment || '';
            form.isActive.checked = customer.isActive || false;
            form.isBlocked.checked = customer.isBlocked || false;
            form.address.value = customer.address || '';
            form.city.value = customer.city || '';
            form.postalCode.value = customer.postalCode || '';
            form.region.value = customer.region || '';
            form.country.value = customer.country || '';
            form.zone.value = customer.zone || '';
            form.pan.value = customer.pan || '';
            form.gstn.value = customer.gstn || '';
            form.paymentTerms.value = customer.paymentTerms || '';
            form.gstRegistered.checked = customer.gstRegistered || false;
            form.tdsApplicable.checked = customer.tdsApplicable || false;
            form.creditLimit.value = customer.creditLimit || '';
            // Populate the contact details if available
            const contactDetailsContainer = document.getElementById('contactDetailsContainer');
            contactDetailsContainer.innerHTML = ''; // Clear existing contact details
            customer.contacts.forEach(contact => {
                const contactRow = document.createElement('div');
                contactRow.innerHTML = `
                    <input type="text" value="${contact.name}" placeholder="Contact Name" />
                    <input type="text" value="${contact.email}" placeholder="Contact Email" />
                    <button type="button" class="btn btn-danger" onclick="removeContact(this)">Remove</button>
                `;
                contactDetailsContainer.appendChild(contactRow);
            });
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
}

// Function to create a new customer
function createCustomer(data) {
    console.log("Customer Data:", Object.fromEntries(data.entries()));
    fetch('/api/customers', {
        method: 'POST',
        body: data
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'index.html'; // Redirect back to index
        } else {
            alert('Failed to create customer.');
        }
    });
}

// Function to update an existing customer
function updateCustomer(id, data) {
    fetch(`/api/customers/${id}`, {
        method: 'PUT',
        body: data
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'index.html'; // Redirect back to index
        } else {
            alert('Failed to update customer.');
        }
    });
}

// Function to edit customer
function editCustomer(id) {
    window.location.href = `create-customer.html?id=${id}`;
}

// Function to delete customer
function deleteCustomer(id) {
    if (confirm("Are you sure you want to delete this customer?")) {
        fetch(`/api/customers/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchCustomers(); // Refresh the customer list
            } else {
                alert('Failed to delete customer.');
            }
        });
    }
}

// Function to search customers
function searchCustomers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#customer-table tbody tr');
    
    rows.forEach(row => {
        const customerName = row.cells[2].textContent.toLowerCase();
        if (customerName.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Function to remove contact
function removeContact(button) {
    const contactRow = button.parentElement;
    contactRow.remove();
}
