export default function NewCard({ onAddPlaceSubmit }) {

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;

    const name = form.elements["card-name"].value;
    const link = form.elements.link.value;

    onAddPlaceSubmit({name, link});
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Title"
          required
          type="text"
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}