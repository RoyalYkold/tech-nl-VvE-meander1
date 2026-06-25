export const newsData = [
  {
    id: 'meandernieuws-mei-2026',
    title: 'Meandernieuws mei 2026',
    date: '2026-05-20',
    summary:
      'Vooruitblik op de ALV, planning voor onderhoud aan algemene ruimten en praktische mededelingen voor bewoners.',
    content: [
      'In mei staat de voorbereiding op de jaarlijkse ALV centraal. Eigenaren ontvangen tijdig de agenda, stukken en een korte toelichting per onderwerp.',
      'Daarnaast is de planning gedeeld voor klein onderhoud aan entree, verlichting en gemeenschappelijke looproutes. Werkzaamheden worden gefaseerd uitgevoerd om overlast te beperken.',
      'Heeft u vragen over onderwerpen voor de ALV of over de planning? Gebruik het contactformulier zodat het bestuur deze punten kan meenemen in de afstemming.',
    ],
  },
  {
    id: 'meandernieuws-april-2026',
    title: 'Meandernieuws april 2026',
    date: '2026-04-14',
    summary:
      'Update over schoonmaakrondes, voortgang van technische controles en aandachtspunten voor bewonerscommunicatie.',
    content: [
      'In april is extra aandacht besteed aan de kwaliteit van de schoonmaak in algemene ruimten. Bevindingen zijn gedeeld met de beheerpartner en opgevolgd.',
      'Technische installaties zijn opnieuw gecontroleerd op veiligheid en continuïteit. Klein herstelwerk wordt direct ingepland.',
      'Bewoners worden gevraagd storingen en bijzonderheden zo concreet mogelijk te melden. Daarmee kunnen meldingen sneller en gerichter worden opgepakt.',
    ],
  },
  {
    id: 'meandernieuws-december-2025',
    title: 'Meandernieuws december 2025',
    date: '2025-12-18',
    summary:
      'Terugblik op 2025 met focus op afgerond onderhoud, samenwerking met leveranciers en prioriteiten voor 2026.',
    content: [
      'Decembernieuws geeft een samenvatting van de afgeronde werkzaamheden in 2025, inclusief verbeteringen aan algemene voorzieningen.',
      'Het bestuur kijkt terug op een jaar waarin bewonersmeldingen sneller zijn afgehandeld door betere afstemming met leveranciers.',
      'Voor 2026 ligt de nadruk op voorspelbaar onderhoud, heldere communicatie en een goede voorbereiding op gezamenlijke besluitvorming in de ALV.',
    ],
  },
  {
    id: 'meandernieuws-brand',
    title: 'Meandernieuws over brand',
    date: '2025-10-05',
    summary:
      'Belangrijke veiligheidsinformatie over brandpreventie, vluchtroutes en het gebruik van het AED-apparaat bij calamiteiten.',
    content: [
      'Veiligheid blijft een gedeelde verantwoordelijkheid. Controleer periodiek of vluchtwegen vrij zijn en meld onveilige situaties direct.',
      'In het bericht is opnieuw uitgelegd waar bewoners de actuele veiligheidsinstructies kunnen vinden en hoe te handelen bij een calamiteit.',
      'Het bestuur benadrukt dat snelle melding en duidelijke informatie essentieel zijn voor een veilige woonomgeving voor iedereen.',
    ],
  },
  {
    id: 'meandernieuws-september-2025',
    title: 'Meandernieuws september 2025',
    date: '2025-09-17',
    summary:
      'Nazomerbericht over groenonderhoud, toegang tot gemeenschappelijke voorzieningen en planning van najaarscontroles.',
    content: [
      'In september is het groenonderhoud rond kade en plein herpland om de kwaliteit van de buitenruimte op peil te houden.',
      'Ook zijn afspraken rond toegang tot gemeenschappelijke voorzieningen opnieuw onder de aandacht gebracht.',
      'De najaarscontroles richten zich op verlichting, deuren en installaties zodat de winterperiode goed voorbereid ingaat.',
    ],
  },
  {
    id: 'meandernieuws-maart-2025',
    title: 'Meandernieuws maart 2025',
    date: '2025-03-21',
    summary:
      'Voorjaarsupdate met eerste onderhoudswerkzaamheden, evaluatie van meldingen en praktische tips voor bewoners.',
    content: [
      'Het maartnummer bevat de eerste planning van voorjaarswerkzaamheden in en rond het complex.',
      'Meldingen van bewoners uit het eerste kwartaal zijn geëvalueerd en gebundeld om structurele verbeterpunten sneller op te pakken.',
      'Bewoners worden gevraagd actuele contactgegevens up-to-date te houden, zodat communicatie over werkzaamheden tijdig aankomt.',
    ],
  },
  {
    id: 'meandernieuws-april-2025',
    title: 'Meandernieuws april 2025',
    date: '2025-04-16',
    summary:
      'Aanvullende aprilupdate over afspraken met onderhoudspartners en voortgang op lopende verbeterpunten.',
    content: [
      'In de aprilupdate zijn aanvullende afspraken met onderhoudspartners gedeeld, inclusief reactietijden en terugkoppeling.',
      'Het bestuur heeft prioriteiten gesteld voor punten die meerdere bewoners raken, zodat capaciteit gericht kan worden ingezet.',
      'Via het portaal en de nieuwsberichten blijft de VvE periodiek informeren over planning, status en vervolgstappen.',
    ],
  },
  {
    id: 'meandernieuws-januari-2025',
    title: 'Meandernieuws januari 2025',
    date: '2025-01-24',
    summary:
      'Start van het jaar met aandacht voor begroting, geplande verbeteringen en communicatiekanalen binnen de VvE.',
    content: [
      'Januari startte met een korte toelichting op de jaarlijkse planning en de belangrijkste beheeronderwerpen.',
      'De VvE zet in op voorspelbare communicatie richting eigenaren en bewoners, met duidelijke contactroutes voor vragen en meldingen.',
      'In dit bericht is ook de rolverdeling tussen bestuur, ALV en beheerpartner toegelicht om verwachtingen helder te houden.',
    ],
  },
]

export const sortedNewsData = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date))

export function getNewsById(id) {
  return newsData.find((item) => item.id === id)
}
