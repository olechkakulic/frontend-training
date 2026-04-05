import {
  Button,
  Card,
  Container,
  Divider,
  Group,
  NumberInput,
  Popover,
  Select,
  Stack,
  Text,
  Textarea,
  Title,
  Loader,
} from "@mantine/core";

import { fetchItemById, updateItem } from "../api/items";
import {
  requestAiDescription,
  requestAiPrice,
  requestAiChatWithAd,
} from "../api/ai";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  AutoFields,
  RealEstateFields,
  ElectronicsFields,
} from "../components/edit/CategoryFields";
import { IconRefresh, IconBulb } from "@tabler/icons-react";
import { LabelWithLeftAsterisk } from "../components/edit/LabelWithLeftAsterisk";
import { notifications } from "@mantine/notifications";
import { ClearableTextInput } from "../components/edit/ClearableField";
import classes from "./AdEditPage.module.css";

type Category = "auto" | "real_estate" | "electronics";
type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export const AdEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchedPrice, setHasFetchedPrice] = useState(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [descriptionPopoverOpened, setDescriptionPopoverOpened] =
    useState(false);

  const [aiResponse, setAiResponse] = useState("");
  const [isAiPriceLoading, setIsAiPriceLoading] = useState(false);

  const [aiDescription, setAiDescription] = useState("");
  const [isAiDescriptionLoading, setIsAiDescriptionLoading] = useState(false);

  const form = useForm({
    initialValues: {
      category: "electronics" as Category,
      title: "",
      price: 0,
      description: "",
      params: {},
    },
    validate: {
      title: (value) =>
        !value || value.length < 1 ? "Название должно быть заполнено" : null,
      price: (value) =>
        !value || value <= 0 ? "Цена должна быть заполнена" : null,
    },
    validateInputOnBlur: true,
  });

  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    const nextMessages: ChatMessage[] = [
      ...chatMessages,
      { role: "user", text: userMessage },
    ];

    setChatMessages(nextMessages);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const answer = await requestAiChatWithAd({
        title: form.values.title,
        category: form.values.category,
        price: form.values.price,
        description: form.values.description,
        params: form.values.params,
        history: nextMessages,
        question: userMessage,
      });

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: answer || "Не удалось получить ответ." },
      ]);
    } catch (error) {
      console.error("Chat AI error:", error);
      notifications.show({
        title: "Ошибка AI-чата",
        message: "Не удалось получить ответ",
        color: "red",
      });
    } finally {
      setIsChatLoading(false);
    }
  };

  useEffect(() => {
    async function loadAd() {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await fetchItemById(id);
        form.setValues(data);
      } catch (err) {
        console.error(err);
        notifications.show({
          title: "Ошибка загрузки",
          message: "Не удалось загрузить объявление",
          color: "red",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadAd();
  }, [id]);

  const getAiPrice = async () => {
    try {
      setIsAiPriceLoading(true);

      const responseText = await requestAiPrice({
        title: form.values.title,
        category: form.values.category,
        params: form.values.params,
      });

      setAiResponse(responseText);
      setHasFetchedPrice(true);
      setPopoverOpened(true);
    } catch (error) {
      console.error("Ошибка AI:", error);
      notifications.show({
        title: "Произошла ошибка при запросе к AI",
        message: "Попробуйте повторить запрос или закройте уведомление",
        color: "red",
        autoClose: false,
        withCloseButton: true,
      });
    } finally {
      setIsAiPriceLoading(false);
    }
  };

  const handleApplyAiPrice = () => {
    const match = aiResponse.match(/цена:\s*(\d+)/i);
    if (!match) {
      notifications.show({
        title: "Ошибка",
        message: "Не удалось найти цену в ответе ИИ",
        color: "red",
      });
      return;
    }

    const parsedPrice = parseInt(match[1], 10);
    form.setFieldValue("price", parsedPrice);

    notifications.show({
      title: "Цена обновлена",
      message: `Установлена цена: ${parsedPrice} ₽`,
      color: "blue",
    });

    setPopoverOpened(false);
    setAiResponse("");
  };

  const getAiDescription = async () => {
    try {
      setIsAiDescriptionLoading(true);

      const responseText = await requestAiDescription({
        title: form.values.title,
        category: form.values.category,
        price: form.values.price,
        params: form.values.params,
        description: form.values.description,
      });

      setAiDescription(responseText);
      setDescriptionPopoverOpened(true);
    } catch (error) {
      console.error("AI Description error:", error);
      notifications.show({
        title: "Произошла ошибка при запросе к AI",
        message: "Попробуйте повторить запрос или закройте уведомление",
        color: "red",
        autoClose: false,
        withCloseButton: true,
      });
    } finally {
      setIsAiDescriptionLoading(false);
    }
  };

  const handleApplyAiDescription = () => {
    if (!aiDescription.trim()) {
      notifications.show({
        title: "Ошибка",
        message: "Не удалось получить описание от ИИ",
        color: "red",
      });
      return;
    }

    form.setFieldValue("description", aiDescription.trim());

    notifications.show({
      title: "Описание обновлено",
      message: "Текст описания успешно применён",
      color: "blue",
    });

    setDescriptionPopoverOpened(false);
    setAiDescription("");
  };

  const handleSave = async (values: typeof form.values) => {
    if (!id) return;

    try {
      const cleanedParams = Object.fromEntries(
        Object.entries(values.params).filter(
          ([, value]) => value !== "" && value !== null && value !== undefined,
        ),
      );

      const bodyToUpdate = {
        category: values.category,
        title: values.title,
        description: values.description || "",
        price: values.price,
        params: cleanedParams,
      };

      await updateItem(id, bodyToUpdate);

      notifications.show({
        title: "Изменения сохранены",
        message: null,
        color: "teal",
      });

      navigate(`/ads/${id}`);
    } catch (err) {
      console.log(err);
      notifications.show({
        title: "Ошибка сохранения",
        message:
          "При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.",
        color: "red",
      });
    }
  };

  const CategoryFormMap = {
    auto: AutoFields,
    real_estate: RealEstateFields,
    electronics: ElectronicsFields,
  };

  const SpecificFields = CategoryFormMap[form.values.category];

  if (isLoading) {
    return (
      <Container size="xl" w="100%" px="md" py="xl">
        <Text>Загрузка...</Text>
      </Container>
    );
  }

  return (
    <Container
      size="xl"
      w="100%"
      px="md"
      py="xl"
      className={classes.rootContainer}
    >
      <form onSubmit={form.onSubmit(handleSave)}>
        <Stack gap="lg">
          <Title order={1}>Редактирование объявления</Title>

          <Card withBorder radius="md" p="lg">
            <Stack gap="md">
              <Select
                w="50%"
                label="Категория"
                data={[
                  { value: "electronics", label: "Электроника" },
                  { value: "auto", label: "Авто" },
                  { value: "real_estate", label: "Недвижимость" },
                ]}
                {...form.getInputProps("category")}
                onChange={(val) => {
                  form.setFieldValue("category", val as Category);
                  form.setFieldValue("params", {});
                }}
              />

              <Divider />

              <ClearableTextInput
                w="50%"
                label={<LabelWithLeftAsterisk label="Название" required />}
                {...form.getInputProps("title")}
              />

              <Group align="flex-end">
                <NumberInput
                  min={0}
                  allowDecimal={false}
                  w="50%"
                  label={<LabelWithLeftAsterisk label="Цена" required />}
                  placeholder="Введите цену"
                  {...form.getInputProps("price")}
                />

                <Popover
                  opened={popoverOpened}
                  onClose={() => {
                    setPopoverOpened(false);
                    setAiResponse("");
                  }}
                  position="top"
                  withArrow
                  shadow="md"
                  width={520}
                  trapFocus={false}
                >
                  <Popover.Target>
                    <Button
                      w="30%"
                      variant="light"
                      onClick={getAiPrice}
                      color="orange"
                      leftSection={
                        isAiPriceLoading ? (
                          <Loader size="xs" type="oval" color="orange" />
                        ) : hasFetchedPrice ? (
                          <IconRefresh size={16} />
                        ) : (
                          <IconBulb size={16} />
                        )
                      }
                    >
                      {isAiPriceLoading
                        ? "Выполняется запрос"
                        : hasFetchedPrice
                          ? "Повторить запрос"
                          : "Узнать цену"}
                    </Button>
                  </Popover.Target>

                  <Popover.Dropdown>
                    {aiResponse && (
                      <Card
                        withBorder
                        radius="md"
                        p="md"
                        className={classes.nakedCard}
                      >
                        <Stack gap="sm">
                          <Text fw={600} size="sm">
                            Ответ AI:
                          </Text>

                          <Text
                            size="sm"
                            style={{ whiteSpace: "pre-line", lineHeight: 1.5 }}
                          >
                            {aiResponse}
                          </Text>

                          <Group gap="sm" mt="xs">
                            <Button
                              size="xs"
                              variant="filled"
                              onClick={handleApplyAiPrice}
                              w="30%"
                            >
                              Применить
                            </Button>

                            <Button
                              size="xs"
                              variant="outline"
                              color="gray"
                              w="30%"
                              onClick={() => {
                                setPopoverOpened(false);
                                setAiResponse("");
                              }}
                            >
                              Закрыть
                            </Button>
                          </Group>
                        </Stack>
                      </Card>
                    )}
                  </Popover.Dropdown>
                </Popover>
              </Group>

              <Divider />

              <Stack gap="sm" w="50%">
                <Title order={3}>Характеристики</Title>
                {SpecificFields && <SpecificFields form={form} />}
              </Stack>

              <Divider />

              <Stack gap={4}>
                <Textarea
                  label="Описание"
                  autosize
                  minRows={4}
                  {...form.getInputProps("description")}
                  styles={{
                    input: !form.values.description
                      ? { borderColor: "orange" }
                      : undefined,
                  }}
                />

                <Popover
                  opened={descriptionPopoverOpened}
                  onClose={() => {
                    setDescriptionPopoverOpened(false);
                    setAiDescription("");
                  }}
                  position="bottom-start"
                  withArrow
                  shadow="md"
                  width={520}
                  trapFocus={false}
                >
                  <Popover.Target>
                    <Button
                      mt="xs"
                      variant="light"
                      color="orange"
                      w="fit-content"
                      leftSection={
                        isAiDescriptionLoading ? (
                          <Loader size="xs" type="oval" color="orange" />
                        ) : aiDescription ? (
                          <IconRefresh size={16} />
                        ) : (
                          <IconBulb size={16} />
                        )
                      }
                      onClick={getAiDescription}
                    >
                      {isAiDescriptionLoading
                        ? "Выполняется запрос"
                        : form.values.description?.trim()
                          ? "Улучшить описание"
                          : "Придумать описание"}
                    </Button>
                  </Popover.Target>

                  <Popover.Dropdown>
                    {aiDescription && (
                      <Card
                        withBorder
                        radius="md"
                        p="md"
                        className={classes.nakedCard}
                      >
                        <Stack gap="sm">
                          <Text fw={600} size="sm">
                            Ответ AI:
                          </Text>

                          <Text
                            size="sm"
                            style={{ whiteSpace: "pre-line", lineHeight: 1.5 }}
                          >
                            {aiDescription}
                          </Text>

                          <Group gap="sm" mt="xs">
                            <Button
                              size="xs"
                              variant="filled"
                              onClick={handleApplyAiDescription}
                            >
                              Применить
                            </Button>

                            <Button
                              size="xs"
                              variant="outline"
                              color="gray"
                              onClick={() => {
                                setDescriptionPopoverOpened(false);
                                setAiDescription("");
                              }}
                            >
                              Закрыть
                            </Button>
                          </Group>
                        </Stack>
                      </Card>
                    )}
                  </Popover.Dropdown>
                </Popover>
              </Stack>

              <Group mt="md">
                <Button type="submit" disabled={!form.isValid()}>
                  Сохранить
                </Button>

                <Button
                  component={Link}
                  to={id ? `/ads/${id}` : "/ads"}
                  variant="default"
                >
                  Отменить
                </Button>
              </Group>
            </Stack>
          </Card>
        </Stack>
      </form>

      {isChatOpen && (
        <Card
          withBorder
          shadow="md"
          radius="md"
          p="md"
          className={classes.chatCard}
        >
          <Stack gap="sm">
            <Group justify="space-between" align="center">
              <Title order={4}>Чат с AI</Title>
            </Group>

            <Divider />

            <Stack gap="xs" className={classes.messagesStack}>
              {chatMessages.length === 0 ? (
                <Text c="dimmed" size="sm">
                  Задайте вопрос по текущему объявлению
                </Text>
              ) : (
                chatMessages.map((msg, index) => (
                  <Card
                    key={index}
                    p="xs"
                    radius="md"
                    bg={msg.role === "user" ? "gray.1" : "orange.0"}
                    className={`${classes.messageCard} ${msg.role === "user" ? classes.userMessageCard : classes.assistantMessageCard}`}
                  >
                    <Text size="sm">{msg.text}</Text>
                  </Card>
                ))
              )}

              {isChatLoading && (
                <Group gap="xs">
                  <Loader size="xs" />
                  <Text size="sm" c="dimmed">
                    AI думает...
                  </Text>
                </Group>
              )}
            </Stack>

            <Textarea
              placeholder="Задайте вопрос по объявлению"
              value={chatInput}
              onChange={(event) => setChatInput(event.currentTarget.value)}
              autosize
              minRows={2}
              maxRows={4}
            />

            <Group justify="space-between">
              <Button variant="default" onClick={() => setIsChatOpen(false)}>
                Скрыть
              </Button>
              <Button onClick={handleSendChatMessage} loading={isChatLoading}>
                Отправить
              </Button>
            </Group>
          </Stack>
        </Card>
      )}

      {!isChatOpen && (
        <Button
          className={classes.openChatButton}
          onClick={() => setIsChatOpen(true)}
        >
          Открыть чат с AI
        </Button>
      )}
    </Container>
  );
};