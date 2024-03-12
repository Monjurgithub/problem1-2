import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const Problem2 = () => {
    const [modal, setModal] = useState(null);
    const [modalContent, setModalContent] = useState([]);
    const [onlyEven, setOnlyEven] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showModalC, setShowModalC] = useState(false);

    useEffect(() => {
        if (modal) {
            let apiUrl;
            if (modal === 'All Contacts') {
                apiUrl = `https://contact.mediusware.com/api/contacts/?search=${searchTerm}&page=${currentPage}`;
            } else if (modal === 'US Contacts') {
                apiUrl = `https://contact.mediusware.com/api/country-contacts/United%20States/?search=${searchTerm}&page=${currentPage}`;
            }

            setLoading(true);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    setModalContent(data.results);
                    setLoading(false);
                });
        }
    }, [modal, currentPage, searchTerm]);

    const handleOpenModal = (modalType) => {
        setModalContent([]);
        setCurrentPage(1);
        setModal(modalType);
        setSelectedContact(null);
        setShowModalC(false); 
    };

    const handleCloseModal = () => {
        setModal(null);
        setSelectedContact(null); 
        setShowModalC(false); 
    };

    const handleCheckboxChange = () => {
        setOnlyEven(!onlyEven);
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        let apiUrl;
        if (modal === 'All Contacts') {
            apiUrl = `https://contact.mediusware.com/api/contacts/?search=${searchTerm}&page=${currentPage}`;
        } else if (modal === 'US Contacts') {
            apiUrl = `https://contact.mediusware.com/api/country-contacts/United%20States&page=${currentPage}`;
        }

        setLoading(true);
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setModalContent(data.results);
                setLoading(false);
            });

        setCurrentPage(1);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleLoadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleContactItemClick = (contact) => {
        setSelectedContact(contact);
        setShowModalC(true);
    };

    const filteredContacts = onlyEven ? modalContent.filter(contact => contact.id % 2 === 0) : modalContent;

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                
                <div className="d-flex justify-content-center gap-3">
                    <Button variant="outline-primary" onClick={() => handleOpenModal('All Contacts')}>All Contacts</Button>
                    <Button variant="outline-warning" onClick={() => handleOpenModal('US Contacts')}>US Contacts</Button>
                </div>
                
                {modal && (
                    <Modal show={true} onHide={handleCloseModal} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>{modal}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    id="onlyEvenCheckbox"
                                    label="Only even"
                                    checked={onlyEven}
                                    onChange={handleCheckboxChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchInputChange}
                                    onKeyPress={handleKeyPress}
                                />
                            </Form.Group>
                            <ul>
                                {filteredContacts.map(contact => (
                                    <li key={contact.id} onClick={() => handleContactItemClick(contact)}>
                                        {contact.phone} - {contact.country.name}
                                    </li>
                                ))}
                            </ul>
                            {loading && <p>Loading...</p>}
                            {!loading && modalContent.length > 0 && (
                                <Button onClick={handleLoadMore}>Load More</Button>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => handleOpenModal('All Contacts')}>Modal Button A</Button>
                            <Button variant="warning" onClick={() => handleOpenModal('US Contacts')}>Modal Button B</Button>
                            <Button variant="outline-primary" onClick={handleCloseModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                )}

                {showModalC && (
                    <Modal show={true} onHide={() => setShowModalC(false)} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Contact Details Modal C</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>ID: {selectedContact.id}</p>
                            <p>Phone: {selectedContact.phone}</p>
                            <p>Country: {selectedContact.country.name}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-primary" onClick={() => handleOpenModal('All Contacts')}>Modal Button A</Button>
                            <Button variant="warning" onClick={() => handleOpenModal('US Contacts')}>Modal Button B</Button>
                            <Button variant="outline-primary" onClick={() => setShowModalC(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default Problem2;
