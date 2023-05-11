import Modal from "react-modal";
import { useProductContext } from "../../hooks/useProductContext";
import "./style.scss";

Modal.setAppElement("#root"); // This line is important for accessibility and must point to your app root.

export function ProductModal({ modalIsOpen, closeModal }) {
  const {
    name,
    setName,
    price,
    setPrice,
    description,
    setDescription,
    addProduct,
  } = useProductContext();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct();

    setName("");
    setDescription("");
    setPrice("");

    closeModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Product Modal"
      className="product-modal"
    >
      <div onClick={closeModal} className="overlay">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="modalContainer"
        >
          <div className="header-modal">
            <h1 className="title-modal">Adicionar Produto</h1>
            <p className="closeBtn" onClick={closeModal}>
              Fechar
            </p>
          </div>

          <div className="content-product-modal">
            <form className="form" onSubmit={handleSubmit}>
              <label className="label-product">Título do Produto</label>
              <input
                className="input"
                type="text"
                name="title"
                value={name}
                onChange={handleChangeName}
              />
              <label className="label-product">Descricão do Produto</label>
              <input
                className="input"
                type="text"
                name="title"
                value={description}
                onChange={handleChangeDescription}
              />
              <label className="label-product">Preço</label>
              <input
                className="input"
                type="text"
                name="price"
                value={price}
                onChange={handleChangePrice}
              />
              <button className="btn-modal" type="submit">
                Cadastrar Produto
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
