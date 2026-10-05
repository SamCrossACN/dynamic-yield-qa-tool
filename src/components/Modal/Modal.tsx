import React from 'react';
import { Close } from '../../elements/Icon/Icon';
import { Audience, Campaign } from "../../types";
import { ExperienceConditions } from "../ExperienceConditions/ExperienceConditions";

type ModalProps = {
  audience?: Audience;
  campaign?: Campaign;
  loading: boolean;
  onClose: () => void;
}

export const Modal = ({ audience, campaign, loading, onClose }: ModalProps) => {
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const title = !!audience ? audience.name : !!campaign ? campaign.name : 'Error';

  return (
    <div className="modal-container active" onClick={handleBackdropClick}>
      <div className={`modal ${loading ? 'loading' : ''}`}>
        <span className="modal-title-container">
          <div className="modal-title">
            {`${title} | Criteria`}
          </div>
          <button className="close-modal-button" onClick={onClose}>
            <Close />
          </button>
        </span>
        <div className="modal-body-container">
          {
            audience && audience.rule.map((rule, index) => (
              <ExperienceConditions key={index} rule={rule} />
            ))
          }
          {
            campaign && campaign.experiences.map((experience) => (
              <ExperienceConditions key={experience.id} experience={experience} />
            ))
          }
        </div>
        <div className="modal-Loading">
          <div className="loading-text">Loading...</div>
          <div className="loading-bar">
            <div className="loader">
              <div className="loading"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}