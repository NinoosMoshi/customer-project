package com.ninos.service;

import com.ninos.exception.UserNotFoundException;
import com.ninos.model.Customer;
import com.ninos.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CustomerServiceImpl implements CustomerService {

    private CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    public Customer addCustomer(Customer customer) {
        customer.setCustomerCode(UUID.randomUUID().toString());
        return customerRepository.save(customer);
    }

    @Override
    public List<Customer> findAllCustomer() {
        return customerRepository.findAll();
    }

    @Override
    public Customer updateCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer findCustomerById(Long id) {
        return customerRepository.findCustomerById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + "was not found"));
    }

    @Override
    public void deleteCustomer(Long id) {
      customerRepository.deleteById(id);
    }
}
