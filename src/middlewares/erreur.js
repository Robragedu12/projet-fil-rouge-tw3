export function gestionnaireErreurs(err, req, res, next) {
  console.error(err);
  const status = err.statusCode ?? 500;
  res.status(status).json({
    error: status === 500 ? "Erreur interne du serveur" : err.message,
  });
}

export default gestionnaireErreurs;