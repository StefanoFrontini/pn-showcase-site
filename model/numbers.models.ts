export interface Metrics1 {
  last_run: string;
  nb_version: string;
  totale_notifiche: TotaleNotifiche[];
  notifiche_per_mese: NotifichePerMese[];
}

export interface NotifichePerMese {
  month: string;
  num_iun_analog: number;
  num_iun_digital: number;
  num_iun_total: number;
}

export interface TotaleNotifiche {
  year: null | string;
  type_notification: string;
  num_iun: number;
}

export interface Metrics2 {
  last_run: string;
  nb_version: string;
  enti_attivi: number;
  tipologie_atto: number;
  top10_cat_enti_n_enti: Top10CatEntiNEnti[];
  top10_ambiti: Top10Ambiti[];
}

export interface Top10Ambiti {
  ambito: string;
  num_iun: number;
}

export interface Top10CatEntiNEnti {
  categoria_ente: string;
  num_enti: number;
}
