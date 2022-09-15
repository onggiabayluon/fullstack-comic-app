function Footer({ title, description, onClick }) {
  return (
    <div className="modal-footer text-center border-top margin-top--md p-2">
      {description}
      <a className="margin-left--sm text-primary modal-text" onClick={onClick}>
        {title}
      </a>
    </div>
  );
}

export default Footer;
