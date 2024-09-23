import pandas as pd
from sklearn.preprocessing import StandardScaler

# Leer el archivo CSV
df = pd.read_csv('anomalias_historicas.csv')

# PREPROCESAR LOS DATOS
scaler = StandardScaler()
df[['pkts_toserver', 'pkts_toclient', 'bytes_toserver', 'bytes_toclient']] = scaler.fit_transform(
    df[['pkts_toserver', 'pkts_toclient', 'bytes_toserver', 'bytes_toclient']]
)

# Los datos están listos para el modelo ML
print(df.head())
print(df.columns)  # Verifica las columnas disponibles
