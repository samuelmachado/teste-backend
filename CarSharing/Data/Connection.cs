using System;
using System.Data;
using Npgsql;
using System.Configuration;

namespace CarSharing.Data
{
    public class Connection
    {
        private string connectionString;
        public Connection()
        {
            connectionString = "Server=localhost;Port=5434;Database=carsharing;User Id=postgres;Password=postgres;";
        }

        public DataSet ExecuteQuery(string query)
        {
            NpgsqlConnection connection = new NpgsqlConnection(connectionString);
            var dataSet = new DataSet();
            try
            {
                connection.Open();
                NpgsqlDataAdapter dataAdapter = new NpgsqlDataAdapter(query, connection);
                dataAdapter.Fill(dataSet);

            }
            catch (Exception ex)
            {
                return new DataSet();
            }
            finally
            {
                connection.Close();
            }
            return dataSet;
        }
    }
}