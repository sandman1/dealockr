import Container from 'react-bootstrap/Container';

function SiteFooter() {
    return (
        <footer className="py-5 my-5">
            <Container className="px-4">
                <p className="text-end">
                Paradigm Financial Services by <a href="/">PFS Inc.</a>.
                    <br />&copy; 20224 Paradigm Financial Services&nbsp;&nbsp;
                </p>
            </Container>
        </footer>
    )
}

export default SiteFooter;