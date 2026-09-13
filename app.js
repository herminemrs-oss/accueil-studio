const drafts = {
  instant: {
    chaleureux: "Hola — bienvenue chez {{marque}}.\n\nMerci pour ton message. On est une petite équipe, on te répond dès qu’on peut (souvent dans la journée).\n\nEn attendant : tu cherches une visite, nos produits, ou autre chose ?",
    premium: "Bonjour,\n\nMerci d’écrire à {{marque}}. Ton message est bien reçu.\nNous revenons vers toi rapidement.\n\nSi c’est urgent, précise-le en une ligne.",
    direct: "Message reçu chez {{marque}}.\nDis-nous en un mot : visite / commande / info — on te guide.",
    es: "Hola, bienvenido/a a {{marque}}.\nRecibimos tu mensaje y te respondemos lo antes posible.\n¿Buscás una visita, productos u otra consulta?"
  },
  welcome: {
    chaleureux: "Bienvenue dans la conversation {{marque}}.\n\nIci on parle de la terre, des récoltes et de ce qu’on met sur la table.\nChoisis une option ci-dessous ou écris-nous simplement.",
    premium: "Bienvenue chez {{marque}}.\nUn message court suffit — on s’occupe du reste.",
    direct: "Tu es dans la messagerie {{marque}}. Dis-nous ce dont tu as besoin.",
    es: "Bienvenido/a a {{marque}}.\nElegí una opción o escribinos con tu consulta."
  },
  away: {
    chaleureux: "On n’est pas derrière l’écran pour le moment.\n{{marque}} te répondra dès la prochaine permanence.\nLaisse ton besoin, on ne laisse personne sans réponse.",
    premium: "{{marque}} est actuellement hors ligne.\nTon message sera lu à la réouverture.",
    direct: "Absence temporaire. On lit tout à la reprise.",
    es: "Ahora no estamos en línea. {{marque}} te responde en el próximo horario de atención."
  },
  keyword: {
    chaleureux: "Tu as tapé un mot qu’on connaît bien.\nVoici l’essentiel — si ça ne suffit pas, réponds « humain » et quelqu’un prend le relais.",
    premium: "Réponse automatique {{marque}}.\nVoici l’info demandée. Un conseiller peut prendre le fil si tu le souhaites.",
    direct: "Info auto. Besoin d’un humain ? Écris « équipe ».",
    es: "Respuesta automática de {{marque}}. Si necesitás hablar con alguien, escribí «humano»."
  },
  comment: {
    chaleureux: "Merci pour ton commentaire.\nOn t’envoie ça en privé comme promis — si le lien ne s’ouvre pas, réponds ici.",
    premium: "Merci. Voici le détail en message privé, depuis {{marque}}.",
    direct: "Voici le lien / l’info liée à ton commentaire.",
    es: "Gracias por tu comentario. Te lo enviamos por privado."
  },
  ice: {
    chaleureux: "Bienvenue chez {{marque}}.\nPar quoi on commence ?",
    premium: "{{marque}} — comment peut-on t’aider ?",
    direct: "Choisis une option ou écris ta question.",
    es: "¿En qué te podemos ayudar hoy?"
  }
};

const $ = (id) => document.getElementById(id);
const els = {
  trigger: $("trigger"),
  tone: $("tone"),
  brand: $("brand"),
  message: $("message"),
  count: $("count"),
  ice1: $("ice1"),
  ice2: $("ice2"),
  ice3: $("ice3"),
  thread: $("thread"),
  status: $("status"),
  templates: $("templates"),
  previewBrand: $("preview-brand"),
  previewSub: $("preview-sub")
};

let platform = "instagram";

function fillDefault() {
  const t = drafts[els.trigger.value][els.tone.value];
  els.message.value = t.replaceAll("{{marque}}", els.brand.value.trim() || "la maison");
  render();
}

function render() {
  const brand = els.brand.value.trim() || "Studio";
  els.previewBrand.textContent = brand;
  els.previewSub.textContent = platform === "instagram"
    ? "Compte professionnel · Instagram"
    : "Page · Messenger";
  els.count.textContent = `${els.message.value.length} / 900`;

  const ices = [els.ice1.value, els.ice2.value, els.ice3.value].filter(Boolean);
  els.thread.innerHTML = "";

  const incoming = document.createElement("div");
  incoming.className = "bubble them";
  incoming.textContent = platform === "instagram" ? "Hola 👋" : "Bonjour !";
  els.thread.appendChild(incoming);

  const out = document.createElement("div");
  out.className = "bubble";
  out.textContent = els.message.value || "…";
  els.thread.appendChild(out);

  if (ices.length) {
    const wrap = document.createElement("div");
    wrap.className = "ices";
    ices.forEach((label) => {
      const b = document.createElement("span");
      b.className = "ice";
      b.textContent = label;
      wrap.appendChild(b);
    });
    els.thread.appendChild(wrap);
  }
}

function loadTemplates() {
  const list = JSON.parse(localStorage.getItem("accueil-templates") || "[]");
  els.templates.innerHTML = "";
  if (!list.length) {
    els.templates.innerHTML = "<p class='caption'>Aucun modèle pour l’instant. Compose puis « Sauver ».</p>";
    return;
  }
  list.slice().reverse().forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `<small>${item.platform} · ${item.trigger}</small><p>${item.message}</p>`;
    card.onclick = () => {
      platform = item.platform;
      document.querySelectorAll(".seg-btn").forEach((b) => b.classList.toggle("active", b.dataset.platform === platform));
      els.trigger.value = item.trigger;
      els.tone.value = item.tone;
      els.brand.value = item.brand;
      els.message.value = item.message;
      els.ice1.value = item.ices[0] || "";
      els.ice2.value = item.ices[1] || "";
      els.ice3.value = item.ices[2] || "";
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    els.templates.appendChild(card);
  });
}

document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    document.getElementById("view-" + btn.dataset.view).classList.add("active");
  };
});

document.querySelectorAll(".seg-btn").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".seg-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    platform = btn.dataset.platform;
    render();
  };
});

["trigger", "tone", "brand", "message", "ice1", "ice2", "ice3"].forEach((id) => {
  $(id).addEventListener("input", render);
  $(id).addEventListener("change", () => {
    if (id === "trigger" || id === "tone") fillDefault();
    else render();
  });
});

$("generate").onclick = fillDefault;

$("copy").onclick = async () => {
  await navigator.clipboard.writeText(els.message.value);
  els.status.textContent = "Message copié. Colle-le dans Meta Business Suite → Inbox → Automations.";
};

$("save").onclick = () => {
  const list = JSON.parse(localStorage.getItem("accueil-templates") || "[]");
  list.push({
    platform,
    trigger: els.trigger.value,
    tone: els.tone.value,
    brand: els.brand.value,
    message: els.message.value,
    ices: [els.ice1.value, els.ice2.value, els.ice3.value],
    at: Date.now()
  });
  localStorage.setItem("accueil-templates", JSON.stringify(list));
  els.status.textContent = "Modèle enregistré dans ce navigateur.";
  loadTemplates();
};

els.ice1.value = "Visite";
els.ice2.value = "Produits";
els.ice3.value = "Parler à quelqu’un";
fillDefault();
loadTemplates();
