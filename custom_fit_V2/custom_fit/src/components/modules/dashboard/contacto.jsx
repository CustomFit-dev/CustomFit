    import { useState } from 'react';
    import { Phone, Mail, Edit2 } from 'lucide-react';

    // ContactCard component with inline CSS
    const ContactCard = () => {
    const [phoneNumber, setPhoneNumber] = useState('+57 311 661 8030');
    const [email, setEmail] = useState('Kevin11234daniel@gmail.com');
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [tempPhone, setTempPhone] = useState(phoneNumber);
    const [tempEmail, setTempEmail] = useState(email);

    const handlePhoneEdit = () => {
        if (isEditingPhone) {
        setPhoneNumber(tempPhone);
        }
        setIsEditingPhone(!isEditingPhone);
    };

    const handleEmailEdit = () => {
        if (isEditingEmail) {
        setEmail(tempEmail);
        }
        setIsEditingEmail(!isEditingEmail);
    };

    // Inline CSS styles
    const styles = {
        container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        },
        card: {
        width: '100%',
        maxWidth: '500px',
        padding: '32px',
        borderRadius: '8px',
        backgroundColor: '#000000',
        },
        heading: {
        fontSize: '24px',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: '40px',
        color: '#38B2AC', // teal color
        },
        sectionContainer: {
        marginBottom: '32px',
        },
        fieldContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px',
        },
        fieldContent: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        },
        flag: {
        marginRight: '8px',
        height: '16px',
        },
        text: {
        color: '#ffffff',
        },
        input: {
        backgroundColor: 'transparent',
        borderWidth: '0 0 1px 0',
        borderColor: '#4a4a4a',
        color: '#ffffff',
        outline: 'none',
        width: '100%',
        },
        button: {
        color: '#38B2AC',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        transition: 'color 0.3s ease',
        },
        divider: {
        borderBottom: '1px solid #333',
        width: '100%',
        }
    };

    return (
        <div style={styles.container}>
        <div style={styles.card}>
            <h2 style={styles.heading}>Contacto</h2>
            
            <div>
            {/* Phone Number Section */}
            <div style={styles.sectionContainer}>
                <div style={styles.fieldContainer}>
                <div style={styles.fieldContent}>
                    <img 
                    src="/api/placeholder/24/16" 
                    alt="Colombia flag" 
                    style={styles.flag} 
                    />
                    {isEditingPhone ? (
                    <input
                        type="text"
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        style={styles.input}
                        autoFocus
                    />
                    ) : (
                    <span style={styles.text}>{phoneNumber}</span>
                    )}
                </div>
                <button 
                    onClick={handlePhoneEdit}
                    style={styles.button}
                >
                    {isEditingPhone ? 'Guardar' : 'Cambiar numero'}
                </button>
                </div>
                <div style={styles.divider}></div>
            </div>

            {/* Email Section */}
            <div style={styles.sectionContainer}>
                <div style={styles.fieldContainer}>
                <div style={styles.fieldContent}>
                    {isEditingEmail ? (
                    <input
                        type="email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        style={styles.input}
                        autoFocus
                    />
                    ) : (
                    <span style={styles.text}>{email}</span>
                    )}
                </div>
                <button 
                    onClick={handleEmailEdit}
                    style={styles.button}
                >
                    {isEditingEmail ? 'Guardar' : 'Cambiar correo'}
                </button>
                </div>
                <div style={styles.divider}></div>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default ContactCard;