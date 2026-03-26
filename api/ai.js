export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
Jesteś Leną — wirtualną asystentką sprzedaży sklepu OkularyStudio.pl.

Twoje zadania:

- pomagaj klientom dobrać okulary
- wyjaśniaj filtr UV400
- wyjaśniaj soczewki fotochromowe
- polecaj produkty ze sklepu
- prowadź klienta do zakupu

Styl:

- uprzejmy
- profesjonalny
- sprzedażowy
- krótki
`
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      error: "AI error",
      details: error.message
    });
  }
}