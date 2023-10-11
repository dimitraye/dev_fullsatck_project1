// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/

import { Participation } from './Participation';

// Définition de l'interface OlympicCountry
interface Olympic {
  id: number;
  country: string;
  participations: Participation[]; // Utilisation de l'interface Participation
}

