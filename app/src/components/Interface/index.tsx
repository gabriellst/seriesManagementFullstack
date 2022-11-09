import { useState, useEffect } from "react";
import { Serie, SerieForm, SerieList } from "../../myTypes";
import { Modal } from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowsRotate, faSignOut } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";

const defaultFormValue: SerieForm = {
  name: null,
  finished: null,
  season: undefined,
  episode: undefined,
};

export default function Interface() {
  const [serieList, setSerieList] = useState<SerieList | undefined>(undefined);
  const [formInfo, setFormInfo] = useState<SerieForm>(defaultFormValue);
  const [serieStatus, setSerieStatus] = useState<string>("true");
  const [isModalOpen, setModalState] = useState(false);
  const axios = useAxiosPrivate();
  const logout = useLogout();

  const requestSeries = async (): Promise<void> => {
    return await axios.get<SerieList>("/query").then((res) => setSerieList(res.data));
  };

  const treatFormForRequest = (formInfo: SerieForm) => {
    const newFormInfo = { ...formInfo, finished: formInfo.finished === "true" ? true : false };
    return newFormInfo;
  };

  const addSerieHandler = async (formInfo: SerieForm): Promise<void> => {
    const body = treatFormForRequest(formInfo);
    const response = await axios.post<SerieList>("/query", body);
    if (response.status === 200) {
      await requestSeries();
    }
    setFormInfo({ ...defaultFormValue, finished: formInfo.finished });
  };

  const updateSerieHandler = async (formInfo: SerieForm): Promise<void> => {
    const body = treatFormForRequest(formInfo);
    const response = await axios.put<SerieList>("/query", body);
    if (response.status === 200) {
      await requestSeries();
    }
    setFormInfo({ ...defaultFormValue, finished: formInfo.finished });
  };

  const disableInputHandler = (formInfo: SerieForm, serieStatus: string): boolean  => {
    if (formInfo["finished"]) {
      return formInfo["finished"] == "true" ? true : false
    }
    return serieStatus == "true" ? true : false
  }

  useEffect(() => {
    void requestSeries();
  }, []);

  return (
    <main>
      <div
        className="logout-wrapper"
        onClick={() => {
          void logout();
        }}
      >
        <FontAwesomeIcon icon={faSignOut} className="logout" />
      </div>

      <form id="form-query">
        <label htmlFor="categoria">Selecionar Categoria</label>
        <select
          id="categoria"
          onChange={(e) => {
            setSerieStatus(e.target.value);
          }}
        >
          <option value="true">Assistido</option>
          <option value="false">Em andamento</option>
        </select>
      </form>

      {serieList ? (
        <div className="table-wrapper">
          <table>
            <thead>
              {serieStatus === "true" ? (
                <tr>
                  <th>Nome</th>
                </tr>
              ) : (
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Temp</th>
                  <th>Ep</th>
                </tr>
              )}
            </thead>
            <tbody>
              {serieStatus === "true"
                ? serieList.finished.map((serie: Serie, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{serie.name}</td>
                      </tr>
                    );
                  })
                : serieList.ongoing.map((serie: Serie, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{serie.id}</td>
                        <td>{serie.name}</td>
                        <td>{serie.season}</td>
                        <td>{serie.episode}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      ) : null}
      <button
        className="button edit-button"
        onClick={() => {
          void setModalState(!isModalOpen);
          setFormInfo({...defaultFormValue, finished: serieStatus});
        }}
      >
        Editar
      </button>
      {isModalOpen ? (
        <Modal>
          <div className="modal-wrapper">
            <div className="modal">
              <form id="form-edit">
                <select
                  className="form-select"
                  id="categoria-modal"
                  name="status"
                  value={formInfo["finished"] ?? serieStatus}
                  onChange={(e) => setFormInfo({ ...formInfo, finished: e.target.value })}
                >
                  <option value="true">Assistido</option>
                  <option value="false">Em andamento</option>
                </select>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Nome"
                  autoComplete="off"
                  onChange={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
                />
                <input
                  className="form-input"
                  type="text"
                  name="id"
                  placeholder="ID (Opcional)"
                  disabled={disableInputHandler(formInfo, serieStatus)}
                  autoComplete="off"
                  onChange={(e) => {
                    setFormInfo({ ...formInfo, id: Number(e.target.value) });
                  }}
                />
                <input
                  className="form-input"
                  type="text"
                  name="season"
                  placeholder="Temporada"
                  disabled={disableInputHandler(formInfo, serieStatus)}
                  autoComplete="off"
                  onChange={(e) => setFormInfo({ ...formInfo, season: Number(e.target.value) })}
                />
                <input
                  className="form-input"
                  type="text"
                  name="episode"
                  placeholder="Episódio"
                  disabled={disableInputHandler(formInfo, serieStatus)}
                  autoComplete="off"
                  onChange={(e) => setFormInfo({ ...formInfo, episode: Number(e.target.value) })}
                />
                <div className="buttons-wrapper">
                  <button
                    className="button"
                    onClick={(e) => {
                      e.preventDefault();
                      void addSerieHandler(formInfo);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                  </button>
                  <button
                    className="button"
                    onClick={(e) => {
                      e.preventDefault();
                      void updateSerieHandler(formInfo);
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowsRotate} className="icon" />
                  </button>
                </div>
              </form>
            </div>
            <div
              className="modal-backdrop"
              onClick={() => {
                setModalState(!isModalOpen);
                setFormInfo(defaultFormValue);
              }}
            ></div>
          </div>
        </Modal>
      ) : null}
    </main>
  );
}