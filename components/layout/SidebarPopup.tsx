"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

type SidebarPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SidebarPopup: React.FC<SidebarPopupProps> = ({ isOpen, onClose }) => {
  const t = useTranslations("footer");
  const tContact = useTranslations("contacto.info");
  const params = useParams();
  const lang = params.lang as string;
  const base = `/${lang}`;

  return (
    <div className={`xs-sidebar-group info-group ${isOpen ? "active" : ""}`}>
      {/* Overlay */}

      {/* Sidebar Content */}
      <div className="xs-sidebar-widget">
        <div className="sidebar-widget-container">
          <div className="widget-heading">
            <button
              onClick={onClose}
              className="close-side-widget"
            >
              <i className="far fa-times"></i>
            </button>
          </div>

          <div className="sidebar-textwidget">
            <div className="sidebar-info-contents">
              <div className="content-inner">
                {/* Logo */}
                <div className="logo">
                  <Link href="/">
                    <img src="/assets/images/logo.png" alt="Logo" />
                  </Link>
                </div>

                {/* About Section */}
                <div className="content-box">
                  <h4>{t("aboutTitle")}</h4>
                  <p>{t("aboutDesc")}</p>
                  <Link href={`${base}/nosotros`} className="theme-btn btn-one">
                    <span>{t("nosotros")}</span>
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="contact-info">
                  <h4>{t("contactTitle")}</h4>
                  <ul>
                    <li>{tContact("locationText")}</li>
                    <li>
                      <Link href={`tel:${t("phone")}`}>{t("phone")}</Link>
                    </li>
                    <li>
                      <Link href={`mailto:${t("email")}`}>{t("email")}</Link>
                    </li>
                  </ul>
                </div>

                {/* Social Links */}
                <ul className="social-box flex gap-4">
                  <li>
                    <Link href="https://www.facebook.com/NUPEC.PREMIUM/">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.instagram.com/nupec_oficial/">
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPopup;
